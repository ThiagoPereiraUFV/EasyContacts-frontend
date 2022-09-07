import type { NextPage } from 'next'
import UserCard from '../../components/organisms/UserCard'

const User: NextPage = () => {
	return <UserCard />
}

User.displayName = 'Perfil'

export default User
