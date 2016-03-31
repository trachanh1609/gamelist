var React = require('react');
var ReactDOM = require('react-dom');


var ItemList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  getDataFromServer: function() {
    fetch(this.props.url).then(
      response => response.json()).then(
        message => {
          this.setState({data: message});
    })
  },
  componentDidMount: function() {
    this.getDataFromServer();
  },
  render: function() {
    var itemNodes = this.state.data.map(function(item) {
      return (
        <Item data={item} key={item.pk} />
      )
    });
    return (
      <div className="item-list">
      {itemNodes}
      </div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className="item">
        {this.props.data.fields.name} | {this.props.data.fields.release_date} | {this.props.data.fields.comment}
      </div>
    );
  }
});

ReactDOM.render(
  <ItemList url="/project/rest/games/" />,
  document.getElementById('content')
);
