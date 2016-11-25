var React = require('react');
var ReactDOM = require('react-dom');

// Option 1: get csrf token from cookies, using this function
// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// var csrftoken = getCookie('csrftoken');
// above code is working

// Option 2: get csrf token from cookies, using library, js-cookies need to be installed
var Cookies = require('js-cookie')
var csrftoken = Cookies.get('csrftoken');

/*
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

*/



var GameTableRow = React.createClass({
  render: function(){
    return (
      <tr>
        <td>{this.props.game.name}</td>
        <td>{this.props.game.tags}</td>
        <td><a href='#' onClick={this.onClick}>Edit or Delete</a></td>
      </tr>
    );
  },

  onClick: function(){
      this.props.handleEditClickPanel(this.props.game.id)

  }
});


var GameTable = React.createClass({
  render: function(){
    var rows = [];
    this.props.games.forEach(function(game) {
      rows.push(<GameTableRow key={game.id} game={game} handleEditClickPanel={this.props.handleEditClickPanel} />);
    }.bind(this));
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Edit or Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );

  }

});



var GameForm = React.createClass({
  render: function(){
    return (
      <form className="form-horizontal" onSubmit={this.props.handleSubmitClick}>

        <label forHtml='name'>Name</label><input ref='name' name='name' type='text' value={this.props.game.name} onChange={this.onChange} />
        <label forHtml='tags'>Tags</label>
        <select ref='tags' name='tags' value={this.props.game.tags} onChange={this.onChange}>
          <option value='1'>Kids</option>
          <option value='2'>Racing</option>
          <option value='3'>RGP</option>
          <option value='4'>Shooting</option>
        </select>
        <br />
        <input type='submit' className="btn btn-success" value={this.props.game.id?"Save (id=" + this.props.game.id+ ")":"Add"} />
        {this.props.game.id?<button className="btn btn-danger" onClick={this.props.handleDeleteClick}>Delete</button>:null}
        {this.props.game.id?<button className="btn btn-warning" onClick={this.props.handleCancelClick}>Cancel</button>:null}
        {this.props.message?<div>{this.props.message}</div>:null}
      </form>
    );
  },

  onChange: function(){
    var name = ReactDOM.findDOMNode(this.refs.name).value ;
    var tags = ReactDOM.findDOMNode(this.refs.tags).value;
    this.props.handleChange(name,tags);

  }

});


var GamePanel = React.createClass({
  getInitialState: function() {
    return {
      games: [],
      editingGame: {
        name:"",
        tags:"",
      },
      message:""
    };
  },
  render:function() {
    return(
      <div className="row">
        <div className="col-md-6">
          <GameTable games={this.state.games} handleEditClickPanel={this.handleEditClickPanel} />
        </div>

        <div className="col-md-6">
          <GameForm
            game={this.state.editingGame}
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmitClick={this.handleSubmitClick}
            handleCancelClick={this.handleCancelClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        </div>
      </div>
    );
  },
  componentDidMount : function() {
    this.reloadGames('');

  },
  handleEditClickPanel: function(id){
    var game = $.extend({}, this.state.games.filter(function(x) {
      return x.id ==id;
    })[0] );

    this.setState({
      editingGame: game,
      message: ''
    });
  },
  handleChange: function(name,tags){
    this.setState({
      editingGame: {
        name: name,
        tags: tags,
        id: this.state.editingGame.id,
      }
    });
  },
  handleCancelClick: function(e) {
    e.preventDefault();
    this.setState({
      editingGame: {}
    });
  },

  reloadGames: function(query){
    $.ajax({
      url: this.props.url+'games/'+query,
      dataType: 'json',
      cach: false,
      success: function(data){
        this.setState({
          games: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({
          message: err.toString()
        });
      }.bind(this)
    });
  },
  handleSubmitClick: function(e) {
    e.preventDefault();
    if(this.state.editingGame.id) {
      $.ajax({
        url: this.props.url + 'games/' + this.state.editingGame.id + '/' ,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        method: 'PUT',
        data: this.state.editingGame,
        cache: false,
        success: function(data){
          this.setState({
            message: "Game successfully updated!"
          });
          this.reloadGames('');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());

          this.setState({
            message: err.toString()+this.props.url+status
          });
        }.bind(this)
      });
    } else {
      $.ajax({
        url: this.props.url + 'games/',
        dataType: 'json',
        method: 'POST',
        data: this.state.editingGame,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        cache: false,
        success: function(data){
          this.setState({
            message: "Game successfully added !"
          });
          this.reloadGames('');
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err.toString());
          this.setState({
            message: err.toString()
          });
        }.bind(this)
      });
    }
    this.setState({
      editingGame: {}
    });
  },
  handleDeleteClick: function(e){
    e.preventDefault();
    $.ajax({
      url: this.props.url+ 'games/' + this.state.editingGame.id + '/',
      method: 'DELETE',
      beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      cache: false,
      success: function(data){
        this.setState({
          mesage: "Successfully deleted game !",
          editingGame: {}
        });
        this.reloadGames('');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({
          message: err.toString()
        });
      }.bind(this)
    });
  }

});


ReactDOM.render(
  <GamePanel url="/project/"/>,
  document.getElementById('main_container')
  )
