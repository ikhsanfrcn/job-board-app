import VerifyCompany from "./_components/verify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const { token } = params;

  return (
    <div>
      <VerifyCompany token={token} />
    </div>
  );
}
