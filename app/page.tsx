import { Box, Button, ButtonText, HStack, Text } from "@gluestack-ui/themed";
import Image from "next/image";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Router } from "@/app/src/trpc";

export default async function Home() {
  const trpc = createTRPCProxyClient<Router>({
    links: [
      httpBatchLink({
        url: "http://localhost:8082/trpc",
      }),
    ],
  });

  const greeting = await trpc.greet.query({ numero: 96, nome: "Gustavo" });

  return (
    <main>
      <Text>{greeting.numero}</Text>
    </main>
  );
}
