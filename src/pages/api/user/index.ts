import { createRouter } from "next-connect";
import { connectToDatabase } from "../../../../../backend/config/db-connection";
import onError from "../../../../../backend/middleware/errors";
import { onClickRoutine } from "../../../../../backend/algos/onClickRoutine";


const router = createRouter();
await connectToDatabase();
router.post(onClickRoutine);
export default router.handler({ onError });
