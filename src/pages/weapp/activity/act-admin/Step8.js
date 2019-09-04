import React, { Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  TimePicker,
  AutoComplete,
  Alert,
  Upload,
  Icon,
  message
} from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const format = 'HH:mm';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ act, weappact }) => ({
  data: act.step,
  data2: weappact.data,
}))
@Form.create()
class Step8 extends React.PureComponent {
  state = {
    dataSource: [],
    xy: [],
    fileList: [],
    imgurl:''
  };
  render() {
    const { form, dispatch, data2 } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { dataSource, xy } = this.state;

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          const vace = {
            ...values,


            'pubact_startTime': values.pubact_startTime.format('HH:mm:ss'),
            'pubact_stopTime': values.pubact_stopTime.format('HH:mm:ss'),
            'pubact_startDate': values.date[0].format('YYYY-MM-DD'),
            'pubact_stopDate': values.date[1].format('YYYY-MM-DD'),
            'pubact_signupStartTime': values.signtime[0].format('YYYY-MM-DD HH:mm:ss'),
            'pubact_signupStopTime': values.signtime[1].format('YYYY-MM-DD HH:mm:ss'),
             userName: localStorage.getItem('user_name'),
            'lat': this.state.lat,
            'lng': this.state.lng,
            'pubact_coordinate':this.state.lat + ','+ this.state.lng,
            'pubact_imgUrl':this.state.imgurl,
          };
          dispatch({
            type: 'act/saveStepData',
            payload: {
              base:{vace}
            },
          });

          router.push('/weapp/activity/act-admin/confirm');
        }
      });
    };
    const onClose = function (e) {
      console.log(e, 'I was closed.');
    };

    const onSelect = value => {
      var value = value.split(",");
      console.log(value)
      var lat = value[0];
      var lng = value[1];
      this.setState({
        lat: lat,
        lng: lng
      })
    };

    const handleSearch = value => {
      if (value == null || value == undefined) {
        return false;
      }
      dispatch({
        type: 'weappact/getRegion',
        payload: {
          keyword: value,
          key: 'LEGBZ-PXBCU-JX2V2-2VSUF-I4JV6-2BFS5',
          region: '河北省',
        },
      });
      // this.state.dataSource=form.data2;

    };
    console.log(data2);
    // console.log(form.data);
    var options = [];
    if (data2.data !== undefined) {
      // console.log(data2.data);

      // const counts = data2.count
      // console.log(counts);
      const arr = Object.keys(data2.data).map(key => data2.data[key]);
      console.log(arr);

      options = arr.map(opt => (
        <Option key={opt.title} title={opt.title} value={opt.location.lat + "," + opt.location.lng} pa={opt.location}>
          {opt.title}
          <span className={styles.certainsearchitemcount}>
            {opt.city}
            {opt.district}
          </span>
        </Option>
      ));

    }

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="活动归属单位">
            {getFieldDecorator('pubact_DWId', {
              rules: [{ required: true, message: '请输入活动归属单位' }],
            })(<Input placeholder="请输入活动归属单位ID" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="置顶顺序">
            {getFieldDecorator('pubact_topNum', {
              rules: [{ required: false, message: '请输入置顶顺序' }],
            })(<Input placeholder="请输入置顶顺序" />)}
          </Form.Item>
          <Alert message="需要选择活动类型" type="info" />
         
          <Form.Item {...formItemLayout} label="是否需要培训">
            {getFieldDecorator('pubact_isNeedTrain', {
              rules: [{ required: true, message: '是否需要培训' }],
            })(
              <Select placeholder="是否需要培训">
                <Option value="0">不需要</Option>
                <Option value="1">需要</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="报名条件">
            {getFieldDecorator('pubact_signupFactor', {
              rules: [{ required: true, message: '请选择报名条件' }],
            })(
              <Select mode='multiple' style={{ width: '100%' }} placeholder="无条件">
                <Option value="0">无条件</Option>
                <Option value="1">需通过培训</Option>
                <Option value="2">支付</Option>
                <Option value="3">扫码核销</Option>
                <Option value="4">签到</Option>
                <Option value="5">签退</Option>
                <Option value="6">奖励</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="个人允许报名次数">
            {getFieldDecorator('pubact_allowSignupNum', {
              rules: [{ required: true, message: '请输入个人允许报名次数' }],
            })(<Input placeholder="请输入个人允许报名次数.0为无限制" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="总允许报名人数">
            {getFieldDecorator('pubact_allowSignupPerNum', {
              rules: [{ required: true, message: '请输入总允许报名人数' }],
            })(<Input placeholder="请输入总允许报名人数.0为无限制" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="参与条件">
            {getFieldDecorator('pubact_joinFactor', {
              rules: [{ required: true, message: '请选择参与条件' }],
            })(
              <Select mode='multiple' style={{ width: '100%' }} placeholder="无条件">
                <Option value="0">无条件</Option>
                <Option value="1">需通过培训</Option>
                <Option value="2">支付</Option>
                <Option value="3">扫码核销</Option>
                <Option value="4">签到</Option>
                <Option value="5">签退</Option>
                <Option value="6">奖励</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动名称">
            {getFieldDecorator('pubact_name', {
              rules: [{ required: true, message: '请输入活动名称' }],
            })(<Input placeholder="请输入活动名称" />)}
          </Form.Item>


          <Form.Item {...formItemLayout} label="报名起止时间">
            {getFieldDecorator('signtime', {
              rules: [
                {
                  required: true,
                  message: '请选择活动报名起止时间',
                },
              ],
            })(
              <RangePicker
                style={{ width: '100%' }}
                showTime={{ format: 'HH:mm:ss' }}
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD HH:mm"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动起止日期">
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: '请选择起止日期',
                },
              ],
            })(
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动开始时间">
            {getFieldDecorator('pubact_startTime', {
              initialValue: moment('08:00', format),
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '请选择开始时间',
                },
              ],
            })(<TimePicker style={{ width: '100%' }} format={format} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动结束时间">
            {getFieldDecorator('pubact_stopTime', {
              initialValue: moment('10:00', format),
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '请选择结束时间',
                },
              ],
            })(<TimePicker style={{ width: '100%' }} format={format} />)}
          </Form.Item>


          <Alert message="输入内容后，将光标移出此单元格两次，即可显示你要查询地点。" type="info" />
          <Form.Item {...formItemLayout} label="活动签到地点">
            <AutoComplete
              dataSource={options}
              onSelect={onSelect.bind(this)}
              optionLabelProp="title"
              onBlur={handleSearch}
              placeholder="输入活动地址后选择"
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动展示地点">
            {getFieldDecorator('pubact_place', {
              rules: [{ required: true, message: '请输入活动展示地点' }],
            })(<Input placeholder="请输入活动展示地点" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动tips">
            {getFieldDecorator('pubact_tips', {
              rules: [{ required: false, message: '活动小字提示' }],
            })(<Input placeholder="请输入活动tips" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动内容">
            {getFieldDecorator('pubact_content', {
              rules: [{ required: true, message: '活动内容' }],
            })(<TextArea rows={4} placeholder="可以直接输入也可以采用富文本" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动备注">
            {getFieldDecorator('pubact_remark', {
              rules: [{ required: false, message: '活动备注' }],
            })(<TextArea rows={3} placeholder="活动备注" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="活动联系人及电话">
            {getFieldDecorator('pubact_phoneNum', {
              rules: [{ required: false, message: '活动联系人及电话' }],
            })(<Input placeholder="请输入活动联系人及电话" />)}
          </Form.Item>
          
          <Form.Item {...formItemLayout} label="活动首图">
            {getFieldDecorator('pubact_imgUrllist', {
              rules: [{ required: false, message: '活动首图' }],
            })(

              <Upload {...{
                action: '/base/UploadImg',
                listType: 'picture',
                name: 'img',
                data: { userName: localStorage.getItem('user_name') },
                onChange: (info) => {
                  let fileList = info.fileList;
                  console.log(fileList)
                  fileList = fileList.map((file) => {
                    if (file.response) {
                      // Component will show file.url as link
                      file.url = file.response.url;
                      this.setState({
                        imgurl:file.response.url
                      })
                    }
                    return file;
                  });
                  console.log(fileList)

                }
              }}>
                <Button>
                  <Icon type="upload" /> Upload
              </Button>
              </Upload>


            )}



          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>首先录入活动基本信息</h4>
          <p>
            活动需要选择活动签到地址，公告则不需要填写签到地址。
            活动签到地址在输入时需要注意，不要在输入框直接打字，建议复制地点文字后粘贴进去，输入完成后如果没有出现选择那么删除最后一个字即可。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step8;
