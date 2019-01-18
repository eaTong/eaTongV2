import AdminIndexPage from '~/pages/AdminIndexPage';
import TaskPage from '~/pages/task/TaskPage';
import UserPage from '~/pages/user/UserPage';
import RolePage from '~/pages/role/RolePage';
import GrantMenuPage from '~/pages/role/GrantMenuPage';
import PasswordPage from './pages/password/PasswordPage';
import BugPage from './pages/bug/BugPage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin/index': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/role': RolePage,
  '/admin/grant': GrantMenuPage,
  '/admin/task': TaskPage,
  '/admin/password': PasswordPage,
  {key: '/admin/bug', component: BugPage},
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
