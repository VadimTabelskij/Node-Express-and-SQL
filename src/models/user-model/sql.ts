const SELECT = `
select 
  u.userId as id,
  u.email,
  u.name,
  u.surname,
  u.phone,
  u.password,
  u.role,
  i.src as image
from user as u
left join image as i
on i.imageId = u.imageId
`;

const SQL = {
  SELECT,
};

export default SQL;
