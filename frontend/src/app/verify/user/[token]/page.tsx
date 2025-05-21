import VerifyUser from "./_components/verify";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  console.log(token);
  return (
    <div>
      <VerifyUser token={token} />
    </div>
  );
}
