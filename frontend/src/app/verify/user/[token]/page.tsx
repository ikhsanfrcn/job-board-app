import VerifyUser from "./_components/verify";

export default function VerifyPage({
  params,
}: {
  params: { token: string }; // ✅ langsung object, bukan Promise
}) {
  const { token } = params;

  return (
    <div>
      <VerifyUser token={token} />
    </div>
  );
}
