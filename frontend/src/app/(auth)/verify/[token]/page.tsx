import VerifyPage from "./_components/verify";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  
  return (
    <div>
      <VerifyPage token={token} />
    </div>
  );
}