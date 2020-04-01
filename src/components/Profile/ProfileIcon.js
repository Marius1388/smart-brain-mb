import React, {Component} from 'react';
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';
import './ProfileIcon.css'

class ProfileIcon extends Component {
    constructor(props){
        super(props);
        this.state ={
            dropdownOpen : false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    onSignoutSubmit = () => {
        const token = window.sessionStorage.getItem('token');
        fetch('http://localhost:3000/signout', {
            method:'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'Authorization': token
            })
        })
        .then(response => response.json())
        .then(result => {
          if (result.signoutSuccess === 'true')
            window.sessionStorage.removeItem('token')
            this.props.onRouteChange('signout');
        })
        .catch(console.log)
      }
    
    render () {
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib" alt="avatar" />
                    
                </DropdownToggle>
                    <DropdownMenu right className='b--transparent shadow-5 dropdown-menu-right' style={{backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={this.onSignoutSubmit}>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </div>
        )
    }
}

export default ProfileIcon;