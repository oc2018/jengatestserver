import cron from "node-cron";
import Property, { PropertyStatus } from "../models/properties.model.js";
import Tenant from "../models/tenants.model.js";
import Txn, { txnAccountType } from "../models/txn.model.js";

export async function startCron() {
  cron.schedule(
    "0 0 1 * *",
    // "* * * * *",
    async () => {
      console.log("Monthly rent check starting ...");
      try {
        const occupiedProperties = await Property.find({
          status: PropertyStatus.OCCUPIED,
        });

        for (const prop of occupiedProperties) {
          prop.balance = (prop.balance || 0) + prop.rent;
          await prop.save();
          // console.log(prop);

          const tenantId = await Tenant.findOne({ property: prop._id });

          // console.log(tenantId);

          await Txn.create({
            accountType: txnAccountType.RENT,
            amount: prop.rent,
            tenantId: tenantId,
            propertyId: prop._id,
          });

          console.log(
            `Charged rent ${prop.rent} for Property ${
              prop.address
            } for the month of ${new Date(prop.createdAt).getMonth() + 1}`
          );
        }

        console.log(`Monthly rent cycle complete`);
      } catch (error) {
        console.log({ error: error.message || error });
      }
    },
    {
      timezone: "Africa/Nairobi",
      schedule: true,
    }
  );
}
