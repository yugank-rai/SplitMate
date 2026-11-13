import { getCategoryIcon } from '../../utils/appIcons.jsx';
import '../../styles/expenses.css';

const CategoryBadge = ({ category }) => {
  const cat = category || 'Other';
  const colorKey = cat.toLowerCase();

  return (
    <span className={`category-badge category-${colorKey}`}>
      <span className='category-badge-icon'>{getCategoryIcon(cat, 13)}</span>
      <span>{cat}</span>
    </span>
  );
};

export default CategoryBadge;
