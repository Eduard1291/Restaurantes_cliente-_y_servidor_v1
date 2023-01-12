create database prueba_tecnica
use prueba_tecnica
create table Menus(
TipoMenu int not null,
NombreMenu varchar(30) primary key not null,
Precio float not null 
);
create table Restaurantes(
RazonSocial varchar(30) primary key not null,
NombreComercial varchar(30) not null,
TipoRestaurante int not null,
Ciudad varchar(30) not null,
HoraApertura varchar(30) not null,
HoraCierre varchar(30) not null
);
create table Menus_Restaurantes(
NombreMenu varchar(30) not null,
RazonSocial varchar(30) not null,
 
);

create table Igredientes_Menus(
idIngredientes int primary key identity (1,1) not null,
NombreMenu varchar(30) not null,
NombreIngrediente varchar(30) not null,
Caloria int  not null,
);

INSERT INTO Restaurantes values ('ramada sa','la ramada',4,'tumaco','10:00','20:00')
insert into Menus values(1,'churrasco','10.2')
DELETE FROM Menus WHERE  idMenu=2
select * from Menus_Restaurantes
select * from Igredientes_Menus
select * from Restaurantes
select * from Menus

delete from Menus_Restaurantes where idMenu>0
delete from Igredientes_Menus where idMenu>0
delete from Menus where idMenu>0

DROP TABLE dbo.Menus;
delete from Restaurantes where RazonSocial='';
update Restaurantes set RazonSocial='sebicheria' where RazonSocial='ramada sa'