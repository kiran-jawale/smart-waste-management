import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { WasteReport } from "../models/wasteReport.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

// This is the controller logic, right in the route file as requested.
router.route("/").get(
  asyncHandler(async (req, res) => {
    // --- 1. Clear Old Data (Keeps Admins Safe) ---
    console.log("Seeder: Deleting old data (non-admins)...");
    await User.deleteMany({ role: { $ne: "admin" } });
    await WasteReport.deleteMany({});

    // --- 2. Define Data for Seeding ---
    
    // We'll use these area codes from your constants
    const areaCodes = [
      "CHH000N1", "WALUJ001", "CIDCO001", "CENTRAL0", "EAST0001",
      "HARSUL01", "SOUTH001", "WEST0001", "OUTER001", "CHH000N2"
    ];

    const usersToCreate = [];
    const password = "Password@123"; // All dummy users will share this password

    // --- 3. Generate User Data ---

    // 10 Citizens
    for (let i = 1; i <= 10; i++) {
      const area = areaCodes[i % areaCodes.length];
      usersToCreate.push({
        code: `100000000${i}`,
        name: `Citizen User ${i}`,
        email: `citizen${i}@test.com`,
        password: password,
        contact: `987654321${i}`,
        role: "citizen",
        areacode: area,
        address: `123 Citizen Street, ${area}`,
      });
    }

    // 5 Organisations
    for (let i = 1; i <= 5; i++) {
      const area = areaCodes[i % areaCodes.length];
      usersToCreate.push({
        code: `200000000${i}`,
        name: `Hospital ${i}`,
        email: `org${i}@test.com`,
        password: password,
        contact: `876543210${i}`,
        role: "organisation",
        areacode: area,
        address: `456 Medical Road, ${area}`,
        status: "Hospital",
      });
    }

    // 2 Collectors
    for (let i = 1; i <= 2; i++) {
      const area = areaCodes[i]; // Assign them to the first two areas
      usersToCreate.push({
        code: `300000000${i}`,
        name: `Collector ${i}`,
        email: `collector${i}@test.com`,
        password: password,
        contact: `765432109${i}`,
        role: "collector",
        areacode: area,
        address: `789 Collector Lane, ${area}`,
      });
    }

    // --- 4. Create Users ---
    // We use User.create() because it triggers the 'pre-save' hook
    // to hash all the passwords. This is crucial.
    console.log("Seeder: Creating new users...");
    await User.create(usersToCreate);

    // --- 5. Create Waste Reports for new Users ---
    console.log("Seeder: Generating waste reports...");
    const reportableUsers = await User.find({
      role: { $in: ["citizen", "organisation"] },
    });

    const reportsToCreate = [];
    for (const user of reportableUsers) {
      // Create 2 "scheduled" reports for each user
      reportsToCreate.push({
        category: "non-harmful-dry-waste",
        reason: "Daily Collection",
        areacode: user.areacode,
        sourceCode: user.code, // Linked to the user
        status: "scheduled",
      });
      reportsToCreate.push({
        category: "e-waste",
        reason: "Scheduled Pickup",
        areacode: user.areacode,
        sourceCode: user.code, // Linked to the user
        status: "scheduled",
      });
    }

    await WasteReport.create(reportsToCreate);
    console.log("Seeder: Database seeding complete!");

    // --- 6. Send Response ---
    res.status(200).json(
      new ApiResponse(200, {}, "Database seeded successfully!")
    );
  })
);

export default router;