import VerifyUser from "./_components/verify";

export default async function VerifyUserPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  return (
    <div>
      <VerifyUser token={token} />
    </div>
  );
}
