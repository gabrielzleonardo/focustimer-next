const Card = ({ activeCard, cardActive, card }) => {
  console.log(cardActive, card);
  return (
    <button
      onClick={() => activeCard(card)}
      className={`card bg-${card} ${
        cardActive === card ? `bg-${card}Active active` : `bg-${card}`
      } dark:bg-[#29292E]`}
    >
      <input type="range"></input>
    </button>
  );
};

export default Card;
