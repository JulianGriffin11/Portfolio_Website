interface SystemFlowProps {
  steps: readonly string[];
}

export function SystemFlow({ steps }: SystemFlowProps) {
  return (
    <ol className="system-flow" aria-label="System and data flow">
      {steps.map((step, index) => (
        <li className="flow-step" key={step}>
          <span className="flow-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{step}</span>
          {index < steps.length - 1 && (
            <span aria-hidden="true" className="flow-arrow">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
