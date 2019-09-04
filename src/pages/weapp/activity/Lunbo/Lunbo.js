import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Input, Form, Select, TextArea,Upload } from 'antd';

import Ellipsis from '@/components/Ellipsis';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CardList.less';
import imgurl from '../../../../assets/RzwpdLnhmvDJToTdfDPe.png';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ list }) => ({
  list,
  loading: list.loading,
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
    });
  }

  render() {
    const { TextArea } = Input;

    const {
      list: { list },
      loading,
    } = this.props;

    console.log(list);
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>在本页面可以完成小程序首页轮播图展示内容的修改等功能。</p>
        {/* <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div> */}
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src={imgurl} />
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

    const addCard = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'list/add',
      });
      // list.push({
      //   lb_id:'',
      //   lb_img_url:'',
      //   lb_type:'huodong',
      //   lb_link:'',
      // })
    };
    const lb_type_change = (e, q) => {
      console.log(e);
      console.log(q);
      list.map(item => {
        if (item.lb_id == e) {
          // console.log(item.lb_img_url);
          item.lb_type = q;
        }
      });
      console.log(list);
    };

    const lb_imgurl_change = (e, q) => {
      console.log(e);
      console.log(q.target.value);
      list.map(item => {
        if (item.lb_id == e) {
          console.log(item.lb_img_url);
          item.lb_img_url = q.target.value;
        }
      });
      console.log(list);
    };
    const lb_link_change = (e, q) => {
      console.log(e);
      console.log(q.target.value);
      list.map(item => {
        if (item.lb_id == e) {
          console.log(item.lb_link);
          item.lb_link = q.target.value;
        }
      });
      console.log(list);
    };
    const lb_tittle_change = (e, q) => {
      console.log(e);
      console.log(q.target.value);
      list.map(item => {
        if (item.lb_id == e) {
          console.log(item.lb_tittle);
          item.lb_tittle = q.target.value;
        }
      });
      console.log(list);
    };
    const lb_content_change = (e, q) => {
      console.log(e);
      console.log(q.target.value);
      list.map(item => {
        if (item.lb_id == e) {
          console.log(item.lb_content);
          item.lb_content = q.target.value;
        }
      });
      console.log(list);
    };

    const lb_sortNum_change = (e, q) => {
      console.log(e);
      console.log(q.target.value);
      list.map(item => {
        if (item.lb_id == e) {
          console.log(item.lb_sortNum_change);
          item.lb_sortNum = q.target.value;
        }
      });
      console.log(list);
    };
    const save = e => {
      // 点击保存
      const { dispatch } = this.props;
      console.log(e);

      list.map(item => {
        if (item.lb_id == e) {
          console.log(item);
          var userName = localStorage.getItem('user_name');

          dispatch({
            type: 'list/save',
            payload: {
              ...item,
              userName: userName,
            },
          });
        }
      });
    };
    const delt = e => {
      // 点击删除
      const { dispatch } = this.props;
      console.log(e);

      list.map(item => {
        if (item.lb_id == e) {
          console.log(item);
          dispatch({
            type: 'list/del',
            payload: item,
          });
        }
      });
    };
    return (
      <PageHeaderWrapper title="轮播管理" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="lb_id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.lb_id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a onClick={delt.bind(this, item.lb_id)}>删除</a>,
                      <a type="primary" onClick={save.bind(this, item.lb_id)}>
                        保存
                      </a>,
                    ]}
                    cover={<img alt="example" src={item.lb_img_url} height={220} />}
                  >
                    <Card.Meta
                      // avatar={<img alt="" className={styles.cardAvatar} src={item.lb_img_url} />}
                      title={
                        <Form onSubmit={this.handleSubmit}>
                          <FormItem {...formItemLayout} label="图片链接">
                            <Select
                              defaultValue={item.lb_type}
                              onChange={lb_type_change.bind(this, item.lb_id)}
                            >
                              <Option value="huodong">活动</Option>
                              <Option value="gonggao">公告</Option>
                            </Select>
                          </FormItem>
                          <FormItem {...formItemLayout} label="轮播标题">
                            <Input
                              defaultValue={item.lb_tittle}
                              onChange={lb_tittle_change.bind(this, item.lb_id)}
                            />
                          </FormItem>
                          <FormItem {...formItemLayout} label="公告内容">
                            <TextArea
                              defaultValue={item.lb_content}
                              onChange={lb_content_change.bind(this, item.lb_id)}
                              autosize={{ minRows: 4, maxRows: 4 }}
                            />
                            
                          </FormItem>
                          <FormItem {...formItemLayout} label="轮播次序">
                            <Input
                              defaultValue={item.lb_sortNum}
                              onChange={lb_sortNum_change.bind(this, item.lb_id)}
                             
                            />
                            </FormItem>
                          <FormItem {...formItemLayout} label="原文链接">
                            <Input
                              defaultValue={item.lb_link}
                              onChange={lb_link_change.bind(this, item.lb_id)}
                            />
                          </FormItem>
                          <FormItem {...formItemLayout} label="图片链接">
                            <Input
                              defaultValue={item.lb_img_url}
                              onChange={lb_imgurl_change.bind(this, item.lb_id)}
                            />
                            
                          </FormItem>
                          <FormItem {...formItemLayout} label="图片上传">
                          <Upload {...{
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
                                  item.lb_img_url='https://dl.hbygxh.org/uploads/'+file.response.url;
                                  this.setState({
                                    pubact_imgUrl: 'https://dl.hbygxh.org/uploads/' + file.response.url
                                  })
                                }
                                return file;
                              });
        
        
                            }
                          }}>
                            <Button>
                              <Icon type="upload" /> Upload
                      </Button>
                          </Upload>
                          </FormItem>

                        </Form>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={addCard}>
                    <Icon type="plus" /> 新增轮播
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
