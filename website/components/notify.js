import uuid from 'uuid/v4';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

class Notify extends Component {
  constructor(props) {
    super(props);
    this.addTimer();
  }

  removeTime() {
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  addTimer() {
    this.timer = setTimeout(() => {
      this.removeTime();
      this.props.deleteNotify();
    }, 3000);
  }

  render() {
    const {notify} = this.props;
    return (
      <div className={`notification is-${notify.type}`}
           onMouseEnter={this.removeTime.bind(this)}
           onMouseLeave={this.addTimer.bind(this)}>
        {notify.closeable && (<button className="delete" onClick={this.props.deleteNotify.bind(this)}/>)}
        {notify.title && (<h2 className="title">{notify.title}</h2>)}
        {notify.content && (<h2 className="content">{notify.content}</h2>)}
      </div>
    )
  }
}

class Notification extends Component {
  render() {
    const notifies = this.props.notifies || [];
    return (
      <div className="notify-container" style={{position: 'fixed', top: 0, left: 0, width: '100%'}}>
        <TransitionGroup>
          {notifies.map(notify => (
            <CSSTransition timeout={600} classNames="example" key={notify.key}>
              <Notify key={notify.key} notify={notify} deleteNotify={() => this.props.deleteNotify(notify)}/>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }
}

const notify = (() => {
  let notifyContainer;
  const CONTAINER_ID = 'notify-container';
  let notifies = [];

  // initialContainer();

  function addNotify(opts, type) {
    initialContainer();
    type = type ? type : 'info';
    const option = typeof opts === 'string' ? {content: opts} : opts;
    notifies.push({type, ...option, closeable: opts.closeable !== false, key: uuid()});
    renderNotifies();
  }

  function deleteNotify(notify) {
    notifies = notifies.filter(item => item.key !== notify.key);
    renderNotifies();
  }

  function renderNotifies() {
    ReactDOM.render(<Notification notifies={notifies} deleteNotify={deleteNotify}/>, notifyContainer);
  }

  function initialContainer() {
    notifyContainer = document.getElementById(CONTAINER_ID);
    if (!notifyContainer) {
      notifyContainer = document.createElement('div');
      notifyContainer.id = CONTAINER_ID;
      document.body.appendChild(notifyContainer);
      renderNotifies();
    }
  }

  return {
    info: (opts) => addNotify(opts, 'info'),
    success: (opts) => addNotify(opts, 'success'),
    warning: (opts) => addNotify(opts, 'warning'),
    error: (opts) => addNotify(opts, 'danger')
  }
})();

export default notify;
