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

  addMessage = () => {
    const { messages, message } = this.state;

    // Stvori novu poruku
    const newMessage = {
      text: message,
      avatar: this.avatar,
      username: this.username,
      fromMe: true,
    };

    // Ako nema postojećih poruka, postavi novu poruku kao prvu
    if (messages.length === 0) {
      this.setState({
        messages: [newMessage],
      });
    } else {
      // Inače dodaj novu poruku na kraj postojećih poruka
      this.setState({
        messages: [...messages, newMessage],
      });
    }

    // Resetiraj stanje poruke na prazan string
    this.setState({ message: "" });
  };

  render() {
    const { messages } = this.state;

    return (
      <div>
        <div className="inp_btn">
          <input
            placeholder="Upiši svoju poruku"
            type="text"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button disabled={!this.state.message} onClick={this.addMessage}>
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
                  message.fromMe ? "from-me" : ""
                }`}
              >
                <img
                  height={36}
                  width={36}
                  src={message.avatar}
                  alt={`Avatar of ${message.username}`}
                  className="c-messages__item__avatar"
                />
                <div className="c-messages__item__content">
                  <span className="c-messages__item__text">
                    {message.username}
                  </span>
                  <span className="c-messages__item__bubble">
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
