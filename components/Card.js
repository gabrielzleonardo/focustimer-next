import { useState } from "react";

const Card = ({ activeCard, cardActive, card, changeCurrentVolume }) => {
  return (
    <div className="relative">
      <button
        onClick={() => activeCard(card)}
        className={`card bg-${card} ${
          cardActive === card ? `bg-${card}Active active` : `bg-${card}`
        } dark:bg-[#29292E]`}
      ></button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        onChange={(e) => changeCurrentVolume(e)}
      />
    </div>
  );
};

export default Card;
