// import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// // import { PrismaClient } from '../generated/prisma/client'
// import { PrismaClient } from "@/app/generated/prisma/client";

// const connectionString = `${process.env.DATABASE_URL}`

// const adapter = new PrismaPg({ connectionString })
// const prisma = new PrismaClient({ adapter })

// export { prisma }

// import { PrismaClient } from "@prisma/client";

// import { PrismaClient } from "@/app/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const connectionString = process.env.DATABASE_URL!; // Make sure this exists

// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient({
//     adapter: new PrismaPg({ connectionString }),
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// import {prisma} from "@/lib/prisma"

const connectionString = process.env.DATABASE_URL!;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
