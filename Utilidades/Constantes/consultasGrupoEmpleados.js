module.exports = {
  OBTENER_LISTA: `
      SELECT ge.idGrupo, ge.nombre, sp.idSetProducto, sp.nombre, 
      COUNT(e.idEmpleado) as totalEmpleados
      FROM Empleado e
      JOIN Empleado_Grupo eg ON e.idEmpleado = eg.idEmpleado
      JOIN Grupo_Empleado ge ON eg.idGrupo = ge.idGrupo
      JOIN Set_Producto_Grupo_Empleado spge ON ge.idGrupo = spge.idGrupo
      JOIN Set_Producto sp ON spge.idSetProducto = sp.idSetProducto
      WHERE ge.idCliente = ?
      GROUP BY ge.idGrupo, sp.idSetProducto;
    `,
};
