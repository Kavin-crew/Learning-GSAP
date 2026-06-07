import AnimatedSections from "./ui/AnimatedSections";

export default function DummySections() {
  return (
    <div>
      {/* Hero — takes up full viewport height but is just a normal block */}
      <AnimatedSections height="100vh" />
    </div>
  );
}
