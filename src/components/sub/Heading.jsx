const Heading = ({ text }) => {
  return (
    <div className="mb-14 self-start">
      <h2
        className="heading-font text-3xl sm:text-2xl font-bold leading-tight tracking-tight"
        style={{ color: "var(--ink-1)" }}
      >
        {text}
      </h2>
      <div
        className="mt-3 h-[3px] w-10 rounded-full"
        style={{ background: "var(--brand-local)" }}
      />
    </div>
  );
};
export default Heading;
