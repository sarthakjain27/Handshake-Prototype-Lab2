import React from 'react';
import './MessageComponent.css';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
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
      showingChats:'',
    }
    this.conversationButtons = this.conversationButtons.bind(this);
    this.showChats = this.showChats.bind(this);
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
            var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min+':'+sec;

            let leftOrRightMessage = eachChat.fromEmailId===localStorage.getItem('email_id') && eachChat.fromRole===localStorage.getItem('userRole')
                                      ? <div class="style__conversations-index-students-message___-uBy2">
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
                                      : <div class="style__conversations-index-students-message___-uBy2">
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
          this.setState({
            allChats: allBeautifulChats
          },()=>{
            console.log('componentWillReceiveProps Updated Chat List')
            console.log(this.state.allChats);
          });
      }
    }
  }

  showChats(otherParticipantEmailId, otherParticipantRole){
    this.props.getAllMessagesOfAConversation({fromEmailId:localStorage.getItem('email_id'),
                                              fromRole:localStorage.getItem('userRole'),
                                              toEmailId:otherParticipantEmailId,
                                              toRole:otherParticipantRole});  
    this.setState({
      otherParticipantEmailId:otherParticipantEmailId,
      otherParticipantRole:otherParticipantRole
    });
                                              
  }

  conversationButtons(){
    if(this.state.allConversations.length > 0){
      let conversationButtons = [];
      this.state.allConversations.forEach((eachConversation)=>{
        let otherParticipantEmailId = eachConversation.participant1emailId === localStorage.getItem('email_id')?eachConversation.participant2emailId:eachConversation.participant1emailId;
        let otherParticipantRole = eachConversation.participant1Role === localStorage.getItem('userRole')?eachConversation.participant2Role:eachConversation.participant1Role;
        let each = 
          <button type="button" class="style__conversations-index-students-conversation-list-item___JflUk style__selected-conversation___1ceuZ" tabIndex="0" aria-pressed="true" onClick={()=>this.showChats(otherParticipantEmailId,otherParticipantRole)}>
            <div class="style__flex___fCvpa">
              <div class="style__text___2ilXR">
                <b>Receiver User Email Id:</b> {otherParticipantEmailId}
              </div>
            </div>
            <div class="style__flex___fCvpa">
              <div class="style__text___2ilXR">
                  <b>Receiver User Role:</b> {otherParticipantRole}
              </div>
            </div>
          </button>
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
                                  <h2 class="style__heading___29i1Z style__large___15W-p">{this.state.otherParticipantEmailId}</h2>
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