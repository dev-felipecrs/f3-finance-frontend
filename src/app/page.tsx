import { Button, Logo } from "@/presentation/components/shared";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-primary-900 text-4xl">Testing</h1>
      <Logo />
      <Button>Testando</Button>
    </div>
  );
}
