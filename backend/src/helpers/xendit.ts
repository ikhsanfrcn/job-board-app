import { Xendit } from 'xendit-node';

const xenditClient = new Xendit({
  secretKey: process.env.SECRET_API_KEY!,
})

export default xenditClient