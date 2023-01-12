select * from Menus
select * from Restaurantes
select * from Igredientes_Menus
select * from Menus_Restaurantes
delete from Menus where NombreMenu='pescado frito'
delete from Igredientes_Menus where NombreMenu='carne asada'
select * from Menus where NombreMenu='carne asada'
insert into Igredientes_Menus values('carne sudada','arroz',205);
select * from Menus where NombreMenu !='pescado frito' and NombreMenu !='sopa'
delete from Menus_Restaurantes where NombreMenu !=''