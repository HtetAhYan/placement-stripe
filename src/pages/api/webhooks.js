import { webhooksHandler } from '@/server/webhooksHandler'
import nc from "next-connect-v0";
const handler = nc({
  onError: (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json(err.message);
  }
})

export const config = {
  api: {
    bodyParser:false
  }
}

handler.post(webhooksHandler)
export default handler