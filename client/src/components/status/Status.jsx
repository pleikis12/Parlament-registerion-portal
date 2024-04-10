import style from './Status.module.css'

export default function Status({ data }) {

  let statusType;

  switch (data) {
    case "Pateiktas":
      statusType = "bg-primary";
      break;
    case "Atmestas":
      statusType = "bg-danger";
      break;
    case "Priimtas":
      statusType = "bg-success";
      break;
    default:
      statusType = "bg-secondary";
      break;
  };

  return (
    <span className={statusType + " text-light " + style.status}>{data}</span>
  )
}
