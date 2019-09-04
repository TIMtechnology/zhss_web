import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Input, Form, Select, TextArea, Row, Col, Divider,message } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import { Upload } from 'antd'
import reqwest from 'reqwest';

import Ellipsis from '@/components/Ellipsis';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CardList.less';
import imgurl from '../../assets/RzwpdLnhmvDJToTdfDPe.png';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ Unit }) => ({
  Unit,
  loading: Unit.loading,
}))
export default class CardList extends PureComponent {

  state = {
    editorState: BraftEditor.createEditorState(null),
    ImgURL:'',
    jianjie:'',
  }
  componentDidMount (){
    const { dispatch,Unit } = this.props;
    dispatch({
      type:'Unit/setGetDWInfo',
    })
    const  {info} = Unit;
    console.log(info)
  
  }


  componentWillReceiveProps(){
    const { Unit } = this.props;
   
    const  {info} = Unit;
    console.log(info)
    if(info){
      
      this.setState({
        jianjie:info[0].Admin_DWInfor_abstract,
        ImgURL:info[0].Admin_DWInfor_imgURL,
        editorState:BraftEditor.createEditorState(info[0].Admin_DWInfor_info)
      })
    }
  }
  hal=()=>{
    const Unit = this.props;
    const {info} = Unit;
    console.log(1+"info:"+info)
    if(info){
      
      this.setState({
        jianjie:info[0].Admin_DWInfor_abstract,
        ImgURL:info[0].Admin_DWInfor_imgURL,
        editorState:BraftEditor.createEditorState(info[0].Admin_DWInfor_info)
      })
    }
  }
  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  uploadHandler = (param) => {
    
    const formData = new FormData();
   formData.append('img',param.file)
   formData.append('userName',localStorage.getItem('user_name'))
    console.log(param)
    if (!param.file) {
      return false
    }
    reqwest({
      url: param.action,
      method: 'post',
      processData: false,
      data: formData,
      success: (a) => {
        console.log(a);
        if(a.error==0){
          //上传成功 
          this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
              type: 'IMAGE',
              url: 'https://dl.hbygxh.org/uploads/'+a.url
            }])
          })
        }else{
          message.error(a);
        }
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });

    

  }

  GetInputValue = (event) => {
    //开始更新state中的base数据

    let e = {};
    e[event.target.id] = event.target.value;

    this.setState(e);

  }

  onSubMit=(event)=>{
    const {dispatch }=this.props;
    
    var data = [];
    data['imgUrl'] = this.state.ImgURL;
    data['jianjie'] = this.state.jianjie;
    data['info']=this.state.editorState.toHTML();

    console.log(data);


    dispatch({
      type:"Unit/setUpdateDWInfo",
      payload:data

    })

  }

  render() {
    const { TextArea } = Input;

    const {

      loading
    } = this.props;


   
    
   
    
    const controls =[
      'undo', 'redo', 'separator',
      'font-size', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
       'separator',
      'clear'
  ]
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept= "image/*"
            showUploadList={ false}
            customRequest={ this.uploadHandler }
            action='/base/UploadImg'
        >
        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */ }
        < button type="button"  className="control-item button upload-button" data- title="插入图片" >
      <Icon type="picture" theme = "filled" />
      </button>
      < /Upload>
        )
  }
    ]
  const content = (
    <div className= { styles.pageHeaderContent } >
    <p>本页用于维护小程序组织页面的组织详情等。</p>

      < /div>
    );

const extraContent = (
  <div className= { styles.extraImg } >
  <img alt="这是一个标题" src = { imgurl } />
    </div>
    );
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};



return (
  <PageHeaderWrapper title= "组织资料维护" content = { content } extraContent = { extraContent } >
    <Row span={ 24 }>
      <Col span={ 24 }>
        <Form.Item
          label="单位简介"
  >
  <TextArea id="jianjie" value = { this.state.jianjie } onChange = { this.GetInputValue } placeholder = "单位简介" />
    </Form.Item>
    < /Col>
    < Col span = { 24} >
      <Form.Item
      label="单位LOGO"
  >
  <Upload {
    ...{
      action: '/base/UploadImg',
      listType: 'picture',
      name: 'img',
      data: { userName: localStorage.getItem('user_name') },
      onChange: (info) => {
        let fileList = info.fileList;
        fileList = fileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
            this.setState({
              ImgURL: 'https://dl.hbygxh.org/uploads/' + file.response.url
            })
          }
          return file;
        });


      }
    }
  } >
  <Button>
  <Icon type="upload" /> Upload
    < /Button>
    < /Upload>
    < /Form.Item>
    < /Col>
    < /Row>

    <Divider> 单位详情
    </Divider>
    < div >
    <div className="editor-wrapper" >
      <BraftEditor
          value={ this.state.editorState }
onChange = { this.handleChange }
controls = { controls }
extendControls = { extendControls }
  />
  </div>
  <Divider>
    </Divider>
    <Button onClick={this.onSubMit}>提交</Button>
  < /div>
  < /PageHeaderWrapper>
    );
  }
}
