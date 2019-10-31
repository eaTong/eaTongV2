import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import RolePage from '~/pages/role/RolePage';
import GrantMenuPage from '~/pages/role/GrantMenuPage';
import PasswordPage from './pages/password/PasswordPage';
import TaskPage from './pages/task/TaskPage';
import FilePage from './pages/file/FilePage';
import BlogPage from './pages/blog/BlogPage';
import CategoryPage from './pages/category/CategoryPage';
import AddBlogPage from "./pages/blog/AddBlogPage";
import VisiteLogPage from './pages/visiteLog/VisiteLogPage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin/index': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/role': RolePage,
  '/admin/grant': GrantMenuPage,
  '/admin/password': PasswordPage,
  '/admin/task': TaskPage,
  '/admin/file': FilePage,
  '/admin/blog': BlogPage,
  '/admin/blog/add': AddBlogPage,
  '/admin/category': CategoryPage,
   '/admin/visiteLog': VisiteLogPage,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
