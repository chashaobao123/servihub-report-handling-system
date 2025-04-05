import { prisma } from "../../prisma/client"

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'user1@servihub.com'
    }
  })

  return (
    <main>Hello {user?.name}</main>
  );
}
