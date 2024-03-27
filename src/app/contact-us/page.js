import ContactUsForm from "../components/ContactUsForm";

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Contact Us</h1>
      <ContactUsForm />
    </div>
  );
}
