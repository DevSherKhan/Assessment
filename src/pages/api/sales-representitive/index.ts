import { createRouter } from "next-connect";
import { connectToDatabase } from "../../../../backend/config/db-connection";
import onError from "../../../../backend/utils/error";
import { updateSaleRepresentative } from "../../../../backend/controller/user-controller";

const router = createRouter();

await connectToDatabase();

// 🔹 Handle PUT request
router.put(updateSaleRepresentative);

export default router.handler({ onError: onError as any });