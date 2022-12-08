import {
  TwitterOutlined,
  createFromIconfontCN,
  YuqueOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { Flex } from '@oasis-engine/editor-components';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2808716_9ux7aqrqvq9.js', // 在 iconfont.cn 上生成
});

export default function Socials() {
  return <Flex gap="md" css={{padding: "0 $6 0 $4"}}>
    <a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/column/c_1369047387231592448'>
      <ZhihuOutlined />
    </a>
    <a target='_blank' rel='noopener noreferrer' href='https://juejin.cn/team/6930507995474313230/posts'>
      <Icon type='icon-juejin' />
    </a>
    <a target='_blank' rel='noopener noreferrer' href='https://www.yuque.com/oasis-engine/blog'>
      <YuqueOutlined />
    </a>
    <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/OasisEngine'>
      <TwitterOutlined />
    </a>
  </Flex>
}