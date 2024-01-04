import React from "react";
import "./Messages.scss";

class Messages extends React.Component {
  state = {
    messages: [],
    message: "",
  };

  avatar =
    "https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg";

  username = "Marina Martinović";

  generateBotReply = () => {
    const botResponse = Math.random() < 0.5 ? "Da" : "Ne";
    const newBotMessage = {
      text: botResponse,
      avatar:
        "https://images.squarespace-cdn.com/content/v1/5b9d4d4a5cfd7967a7b39d4f/1561271571874-57LZSK8UWZR2ZNEX5JCA/chatbot+avatar+Cute_V2.png?format=1500w",
      username: "Bot",
      fromMe: false,
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, newBotMessage],
    }));
  };

  addMessage = () => {
    const { messages, message } = this.state;

    // Stvori novu poruku
    const newMessage = {
      text: message,
      avatar: this.avatar,
      username: this.username,
      fromMe: true,
    };

    // Dodaj novu poruku na kraj postojećih poruka
    this.setState(
      {
        messages: [...messages, newMessage],
        // Resetiraj stanje poruke na prazan string
        message: "",
      },
      () => {
        // Pozovi funkciju za generiranje odgovora chatbota nakon dodavanja korisničke poruke
        this.generateBotReply();
      }
    );
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="obrni">
        <div className="inp_btn">
          <input
            className="input"
            placeholder="Postavi pitanje"
            type="text"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button
            className="btn"
            disabled={!this.state.message}
            onClick={this.addMessage}
          >
            Pošalji
          </button>
        </div>
        <div>
          {!messages.length ? (
            <p>Nema poruka za prikaz</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`c-messages__item ${
                  message.fromMe ? "from-me" : "from-bot"
                }`}
              >
                <img
                  src={message.avatar}
                  alt={`Avatar of ${message.username}`}
                  className={`c-messages__item__avatar ${
                    message.fromMe ? "myavatar" : "botavatar"
                  }`}
                />

                <div className="c-messages__item__content">
                  <span
                    className={`c-messages__item__text ${
                      message.fromMe ? "mytext" : "bottext"
                    }`}
                  >
                    {message.username}
                  </span>

                  <span
                    className={`c-messages__item__bubble ${
                      message.fromMe ? "user-bubble" : "bot-bubble"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Messages;
