import VerifyCompany from "./_components/verify";

export default function VerifyCompanyPage({ params }: { params: { token: string } }) {
  const { token } = params;

  return (
    <div>
      <VerifyCompany token={token} />
    </div>
  );
}
