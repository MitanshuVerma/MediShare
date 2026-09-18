import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("MediShare Smart Contract", function () {
  let medishare;
  let owner;
  let manufacturer;
  let user;

  beforeEach(async function () {
    [owner, manufacturer, user] = await ethers.getSigners();
    const MediShareFactory = await ethers.getContractFactory("Medishare");
    medishare = await MediShareFactory.deploy();
    await medishare.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully and set the owner", async function () {
      expect(await medishare.owner()).to.equal(owner.address);
      expect(await medishare.name()).to.equal("MediAuthToken");
      expect(await medishare.symbol()).to.equal("MAT");
    });
  });

  describe("Medicine Batch Management", function () {
    const batchNumber = "BATCH-2026-XYZ";
    const medName = "Amoxicillin 500mg";
    const brand = "PharmaCorp";
    const manufacturerDetails = "ISO 9001 Certified Lab, Facility #4";

    it("Should add a new medicine batch with future expiry", async function () {
      const futureExpiry = Math.floor(Date.now() / 1000) + 86400 * 365; // 1 year future

      await expect(
        medishare.addMedicine(
          batchNumber,
          medName,
          brand,
          futureExpiry,
          manufacturerDetails,
          manufacturer.address
        )
      ).to.emit(medishare, "MedicineAdded");

      const med = await medishare.getMedicineDetails(batchNumber);
      expect(med.name).to.equal(medName);
      expect(med.brand).to.equal(brand);
      expect(med.isVerified).to.be.false;
      expect(med.exists).to.be.true;
      expect(med.isActive).to.be.true;
    });

    it("Should verify an active medicine batch", async function () {
      const futureExpiry = Math.floor(Date.now() / 1000) + 86400 * 365;

      await medishare.addMedicine(
        batchNumber,
        medName,
        brand,
        futureExpiry,
        manufacturerDetails,
        manufacturer.address
      );

      await expect(medishare.verifyMedicine(batchNumber, true))
        .to.emit(medishare, "MedicineVerified");

      const med = await medishare.getMedicineDetails(batchNumber);
      expect(med.isVerified).to.be.true;
    });

    it("Should authenticate batch and mint ERC721 NFT token", async function () {
      const futureExpiry = Math.floor(Date.now() / 1000) + 86400 * 365;

      await medishare.addMedicine(
        batchNumber,
        medName,
        brand,
        futureExpiry,
        manufacturerDetails,
        manufacturer.address
      );

      await medishare.verifyMedicine(batchNumber, true);

      await expect(
        medishare.authenticateBatch(batchNumber, manufacturer.address)
      ).to.emit(medishare, "MedicineAuthenticated");

      const med = await medishare.getMedicineDetails(batchNumber);
      expect(med.isAuthenticated).to.be.true;
      expect(med.isNFTValid).to.be.true;
      expect(med.tokenId).to.be.greaterThan(0);
    });
  });
});
