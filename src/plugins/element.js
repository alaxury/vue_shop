import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Breadcrumb,
  Row,
  BreadcrumbItem,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tree,
  Select,
  Option,
  Card,
  Tag,
  Cascader
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Option)
Vue.use(Cascader)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
