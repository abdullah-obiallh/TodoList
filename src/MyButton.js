export default function MyButton({ Name, children }) {
  return (
    <>
      <button className="Button">
        <span className="Transition"></span>
        <span className="Gradient"></span>
        <span className="Label">
          {Name} {(children = "" ? "" : children)}
        </span>
      </button>
    </>
  );
}
