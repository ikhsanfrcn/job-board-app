import Verify from "./_components/verify";

export default async function VerifyCertificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      <Verify id={id} />
    </div>
  );
}
