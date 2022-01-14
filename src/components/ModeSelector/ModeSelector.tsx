import './ModeSelector.css'
import { VscColorMode } from 'react-icons/vsc'
import { useTheme } from '../../api/hooks/useTheme';

export default function ModeSelector() {
    const { themeStyle, changeMode } = useTheme();

    const toggleMode = () => {
        const newMode = themeStyle.mode === 'light' ? 'dark' : 'light'
        changeMode(newMode);
    }

    return (
        <div className='mode-selector'>
                <VscColorMode className={ "mode-toggle " + themeStyle.mode } onClick={toggleMode} />
        </div>
    )
}
