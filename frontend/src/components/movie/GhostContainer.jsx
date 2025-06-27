import GhostMovie from "./GhostMovie";
import "./Container.css";

export default function GhostContainer({ type }) {
  const ghosts = [1, 2, 3, 4];
  return (
    <>
      <div className={type}>
        {ghosts.map((id) => (
          <GhostMovie key={id} />
        ))}
      </div>
    </>
  );
}
