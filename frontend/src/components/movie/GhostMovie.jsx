export default function GhostMovie({ movie, ...props }) {
  return (
    <div className="relative">
      <div>
        <div className="movie ghost rounded-xl">
          <div className="Year"></div>

          <div></div>

          <div>
            <h5 className="absolute bottom-6 right-35"></h5>
          </div>
        </div>
      </div>
    </div>
  );
}
