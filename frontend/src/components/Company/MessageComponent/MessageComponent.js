import React from 'react';
import './MessageComponent.css';
import { connect } from 'react-redux';
import {Button, Alert, Image} from 'react-bootstrap';
import {Col, FormGroup} from 'reactstrap';
import {userAllConversations, addMessageInConversation, getAllMessagesOfAConversation} from '../../../actions/messageActions';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';

class MessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allConversations: [],
      allChats: [],
      noRecord:false,
      noRecordChat:false,
      otherParticipantEmailId:'',
      otherParticipantRole:'',
      otherParticipantName:'',
      otherParticipantProfileLink:'',
      showingChats:'',
      inputMessage:'',
    }
    this.conversationButtons = this.conversationButtons.bind(this);
    this.showChats = this.showChats.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  componentDidMount(){
    this.props.userAllConversations({userEmailId:localStorage.getItem('email_id'),userRole:localStorage.getItem('userRole')});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.conversationList) {
      var { conversationList, chatList } = nextProps;
      if(conversationList.noRecord){
          this.setState({
              noRecord: conversationList.noRecord
          });
      } else if(conversationList.allConversations){
          this.setState({
            allConversations: conversationList.allConversations
          },()=>{
            console.log('componentWillReceiveProps Updated Conversation List')
            console.log(this.state.allConversations);
          });
      }
      if(chatList.noRecord){
        this.setState({
          noRecordChat: chatList.noRecord
        });
      } else if(chatList.allChats){
          console.log(chatList.allChats);
          let allBeautifulChats = []
          chatList.allChats.forEach((eachChat)=>{
            var jsDate = new Date(eachChat.createdAt);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = jsDate.getFullYear();
            var month = months[jsDate.getMonth()];
            var date = jsDate.getDate();
            var hour = jsDate.getHours();
            var min = jsDate.getMinutes();
            var sec = jsDate.getSeconds();
            var time = date + ' ' + month + ' ' + year + ', ' + this.convertTime(hour + ':' + min);

            let leftOrRightMessage = eachChat.fromEmailId===localStorage.getItem('email_id') && eachChat.fromRole===localStorage.getItem('userRole')
                                      ? <div class="style__conversations-index-students-message___-uBy2">
                                          <div class="style__flex___fCvpa style__justify-flex-end___229cl">
                                            <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto', order: '0'}}>
                                              <div class="style__flex___fCvpa style__align-flex-end___3huTz style__row-reverse___2-eK8">
                                                <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto', order: '0'}}>
                                                  <div class="style__message-container___1MZ5J">
                                                    <div>
                                                      <div class="style__sent-message___2TLOT style__message___16Jw4">
                                                        <span class="Linkify">
                                                          {eachChat.message}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      : <div class="style__conversations-index-students-message___-uBy2">
                                          <div class="style__flex___fCvpa style__justify-flex-start___33H8N">
                                            <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto', order: '0'}}>
                                              <div class="style__flex___fCvpa">
                                                <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto', order: '0'}}>
                                                  <div class="style__message-container___1MZ5J">
                                                    <div>
                                                      <div class="style__received-message___1EMnF style__message___16Jw4">
                                                        {eachChat.message}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div> 
            let each = <div>
              <div class="style__timestamp___1B3rg">
                <div class="style__text___2ilXR style__muted___2z7cM style__center___ihjch">
                  {time}
                </div>
              </div>
              {leftOrRightMessage}
            </div>
            allBeautifulChats.push(each);
          });
          // pushing the input text field
          allBeautifulChats.push(
              <div class="style__conversation-message-inputs___R0EyU style__bottomBar___ZDvWf">
              <form>
                <FormGroup row>
                  <Col sm={10}>
                    <textarea type="textarea" name="inputMessage" placeholder="Type a message..." class="style__message-input___7_b17" aria-label="Message" onChange={this.onChangeHandler}></textarea>
                  </Col>
                  <Col sm={{ size: 2}}>
                    {/* I am using Button of react-bootstrap and not reactstrap and hence cannot give onSubmit for form and giving onClick of button */}
                    <Button style={{width:120,height:50}} onClick={this.sendMessage}>Send</Button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          );
          this.setState({
            allChats: allBeautifulChats
          },()=>{
            console.log('componentWillReceiveProps Updated Chat List')
            //console.log(this.state.allChats);
          });
      }
    }
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  showChats(otherParticipantEmailId, otherParticipantRole, otherParticipantName, otherParticipantProfileLink){
    this.props.getAllMessagesOfAConversation({fromEmailId:localStorage.getItem('email_id'),
                                              fromRole:localStorage.getItem('userRole'),
                                              toEmailId:otherParticipantEmailId,
                                              toRole:otherParticipantRole});  
    this.setState({
      otherParticipantEmailId:otherParticipantEmailId,
      otherParticipantRole:otherParticipantRole,
      otherParticipantName:otherParticipantName,
      otherParticipantProfileLink:otherParticipantProfileLink
    });                                    
  }

  capitalize(word, splitParam = ' ') {
    console.log(word);
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
  }

  convertTime(time) {
    const hourMinutes = time.split(':');
    if (hourMinutes[0] < 12) {
      if(hourMinutes[1] > 9)
        return `${hourMinutes[0]}:${hourMinutes[1]} AM`;
      else return `${hourMinutes[0]}:0${hourMinutes[1]} AM`;
    } else if (hourMinutes[0] > 12) {
      if(hourMinutes[1] > 9)
        return `${hourMinutes[0] - 12}:${hourMinutes[1]} PM`;
      else return `${hourMinutes[0] - 12}:0${hourMinutes[1]} PM`;
    } else{
      if(hourMinutes[1] > 9)
        return `${hourMinutes[0]}:${hourMinutes[1]} PM`;
      else return `${hourMinutes[0]}:0${hourMinutes[1]} PM`; 
    }
  }

  sendMessage(e){
    e.preventDefault();
    console.log('Inside send Message');
    console.log(this.state.inputMessage)
    this.props.addMessageInConversation({fromEmailId:localStorage.getItem('email_id'),
                                          fromRole:localStorage.getItem('userRole'),
                                          toEmailId:this.state.otherParticipantEmailId,
                                          toRole:this.state.otherParticipantRole,
                                          message:this.state.inputMessage});
  }

  conversationButtons(){
    if(this.state.allConversations.length > 0){
      let conversationButtons = [];
      this.state.allConversations.forEach((eachConversation)=>{
        let otherParticipantEmailId = eachConversation.participant1emailId;
        let otherParticipantRole = eachConversation.participant1Role;
        let otherParticipantName = eachConversation.participant1Name;
        let otherParticipantProfileLink = serverIp+':'+serverPort+'/'+eachConversation.participant1ProfilePictureUrl;
        if(eachConversation.participant1emailId === localStorage.getItem('email_id') && eachConversation.participant1Role === localStorage.getItem('userRole')){
          otherParticipantEmailId = eachConversation.participant2emailId;
          otherParticipantRole = eachConversation.participant2Role;
          otherParticipantName = eachConversation.participant2Name;
          otherParticipantProfileLink = serverIp+':'+serverPort+'/'+eachConversation.participant2ProfilePictureUrl;
        }
        console.log('Other Participant profile picture link: '+otherParticipantProfileLink);
        let each = 
        <div>
          <button type="button" class="style__conversations-index-students-conversation-list-item___JflUk" tabIndex="0" aria-pressed="true" onClick={()=>this.showChats(otherParticipantEmailId,otherParticipantRole, otherParticipantName, otherParticipantProfileLink)}>
            <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto',order:0}}>
              <div class="style__flex___fCvpa">
                <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto',order:0}}>
                  <div class="style__avatar___JZYm_">
                    <div class="style__avatar-small___2kw-_ style__avatar-round___3RzuF">
                      <div class="style__avatar-image___2LV5H" style={{backgroundImage:"url("+otherParticipantProfileLink+ ")"}}> 
                      </div>
                    </div>
                  </div>
                </div>
                <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto',order:0}}>
                  <div class="style__flex___fCvpa">
                    <div class="style__flex-item___2eWZ4">
                      <div class="style__text___2ilXR style__large___3qwwG">
                        <b>{this.capitalize(otherParticipantName)}</b> 
                      </div>
                    </div>
                  </div>
                  <div class="style__flex___fCvpa">
                    <div class="style__flex-item___2eWZ4">
                      <div class="style__text___2ilXR">
                        <i> {otherParticipantEmailId} </i>
                      </div>
                    </div>
                  </div>
                  <div class="style__flex___fCvpa">
                    <div class="style__flex-item___2eWZ4">
                      <div class="style__text___2ilXR style__muted___2z7cM">
                          <b>User-Role:</b> {this.capitalize(otherParticipantRole)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <br />
          <br />
        </div>
        conversationButtons.push(each);
      });
      return conversationButtons;
    } else return [];
  }

  render(){
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let noRecordFoundMessage = "";
    if(this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                There are no conversations yet. Please messages students first.
                </Alert>
    }
    let onClickShowChatUserProfilePicture = null;
    if(this.state.otherParticipantProfileLink!==''){
      onClickShowChatUserProfilePicture = <Image src={this.state.otherParticipantProfileLink}
                                            alt='Profile Picture'
                                            roundedCircle 
                                            style={{height:40, width:40}}/>
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <br />
        
        <div class="main-container">
          <div>
            <div>
              <div>
                <div class="style__conversations-container___1MiId">
                  <div class="style__fullHeight___3uY6O style__card___1rhof" data-hook="card">
                    <div class="style__card-item___B1f7m style__full-height___2Ciyb">
                      <div class="style__flex___fCvpa style__full-height___3AWW4">
                        <div class="style__flex-item___2eWZ4" style={{flex: '0 0 368px', order: 0}}>
                          <div class="style__full-height___1Mr32">
                            <div class="style__flex___fCvpa style__column___1Ye52 style__full-height___3AWW4">
                              <div class="style__list-header___5sQH_ style__topBar___1iT35">
                                <div class="style__flex___fCvpa style__align-center___GzLZc style__full-height___3AWW4">
                                  <div class="style__flex-item___2eWZ4" style={{flex:'0 1 auto', order: 0}}>
                                    <h2 class="style__heading___3SdGZ style__heading___29i1Z">Messages</h2>
                                  </div>
                                </div>
                              </div>
                              <div class="style__message-list___1MTr4 style__viewBody___BTNPl">
                                <div>
                                  <div class="style__message-list___1MTr4 style__viewBody___BTNPl" tabIndex="0" aria-label="Conversation List">
                                    {noRecordFoundMessage}
                                    {this.conversationButtons()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="style__flex-item___2eWZ4" style={{flex: '1 1 auto', order: 0}}>
                          <div class="style__conversations-index-students-selected-conversation___R90km">
                            <div class="style__flex___fCvpa style__column___1Ye52 style__full-height___3AWW4">
                              <div class="style__topBar___1iT35 style__top-bar___8qIho">
                                <div>
                                  {onClickShowChatUserProfilePicture}
                                </div>

                                <div>
                                  <h2 class="style__heading___29i1Z style__large___15W-p">{this.capitalize(this.state.otherParticipantName)}</h2>
                                </div>
                              </div>
                              <div class="style__selected-conversation-messages___2c0ac style__viewBody___BTNPl">
                                {this.state.allChats}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  conversationList:state.message.allConversations,
  chatList:state.message.allChats
});

export default connect(mapStateToProps, {userAllConversations, addMessageInConversation, getAllMessagesOfAConversation})(MessageComponent);