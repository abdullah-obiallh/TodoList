export default function Header({ Name, date = true }) {
  let currentDate = new Date();
  return (
    <div className="Header">
      <h2 style={{ justifyContent: "center" }}>{Name}</h2>
      {date ? (
        <h2>
          {currentDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h2>
      ) : null}
    </div>
  );
}
