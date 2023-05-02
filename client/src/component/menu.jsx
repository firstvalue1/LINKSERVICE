
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

export default function MenuIcon(props) {
    const navigator = useNavigate()
    const handleIcon = (e) => {
        switch (e) {
            case 'A' : return navigator('/manager')
            case 'M' : return navigator('/')
            default : return navigator('/')
        }
    }
    return (
<>
      <div className='menu-wrap'>
        <div className='menu-box'>
          <HomeIcon fontSize='large' color="secondary"
             onClick={() => handleIcon('M')} 
          />
          <SettingsIcon fontSize='large' color="secondary"
             onClick={() => handleIcon('A')} 
          /> 
        </div>
      </div>      
</>
    )
}
