-- 1. La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.

SELECT 
    SUM(e.Cantidad) AS total_cantidad, 
    SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto / 100)) AS importe_total
FROM Entregan e, Materiales m
WHERE e.Clave = m.Clave
AND EXTRACT(YEAR FROM e.Fecha) = 1997;

-- 2. Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.

SELECT 
    p.RazonSocial, 
    COUNT(e.Numero) AS numero_entregas, 
    SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto / 100)) AS importe_total
FROM Proveedores p, Entregan e, Materiales m
WHERE p.RFC = e.RFC AND e.Clave = m.Clave
GROUP BY p.RazonSocial;

/* 3. Por cada material obtener la clave y descripción del material, la cantidad total entregada, 
la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos
 materiales en los que la cantidad promedio entregada sea mayor a 400. */

SELECT 
    m.Clave, 
    m.Descripcion, 
    SUM(e.Cantidad) AS total_cantidad_entregada, 
    MIN(e.Cantidad) AS min_cantidad, 
    MAX(e.Cantidad) AS max_cantidad, 
    SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto / 100)) AS importe_total
FROM Entregan e, Materiales m
WHERE e.Clave = m.Clave
GROUP BY m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) > 400;

/* 4. Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada 
material entregado, detallando la clave y descripción del material, excluyendo aquellos 
proveedores para los que la cantidad promedio sea menor a 500. */

SELECT 
    p.RazonSocial, 
    m.Clave, 
    m.Descripcion, 
    AVG(e.Cantidad) AS cantidad_promedio
FROM Proveedores p, Entregan e, Materiales m
WHERE e.RFC = p.RFC AND e.Clave = m.Clave
GROUP BY p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) >= 500;

/* 5. Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para 
dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es menor 
a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450. */

SELECT 
    p.RazonSocial, 
    m.Clave, 
    m.Descripcion, 
    AVG(e.Cantidad) AS cantidad_promedio,
    CASE 
        WHEN AVG(e.Cantidad) < 370 THEN 'Menos de 370'
        WHEN AVG(e.Cantidad) > 450 THEN 'Más de 450'
    END AS grupo
FROM Proveedores p, Materiales m, Entregan e
WHERE e.RFC = p.RFC AND e.Clave = m.Clave
GROUP BY p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450;

-- 6. Clave y descripción de los materiales que nunca han sido entregados.

SELECT m.Clave, m.Descripcion
FROM Materiales m
WHERE NOT EXISTS (
    SELECT 1 FROM Entregan e WHERE e.Clave = m.Clave
);

/* 7. Razón social de los proveedores que han realizado entregas tanto al proyecto
 'Vamos México' como al proyecto 'Querétaro Limpio'. */

SELECT p.RazonSocial
FROM Proveedores p
WHERE p.RFC IN (
    SELECT e.RFC FROM Entregan e, Proyectos Pr
    WHERE e.Numero = pr.Numero 
    AND pr.Denominacion = 'Vamos México'
) 
AND p.RFC IN (
    SELECT e.RFC FROM Entregan e, Proyectos Pr
    WHERE e.Numero = pr.Numero 
    AND pr.Denominacion = 'Querétaro Limpio'
);

-- 8. Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.

SELECT m.Descripcion
FROM Materiales m
WHERE NOT EXISTS (
    SELECT 1 
    FROM Entregan e  
    JOIN Proyectos pr ON e.Numero = pr.Numero 
    WHERE pr.Denominacion = 'CIT Yucatán'  
    AND e.Clave = m.Clave
);

/* 9. Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad
 entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901' */

SELECT p.RazonSocial, AVG(e.Cantidad) AS promedio_cantidad
FROM Entregan e, Proveedores p
WHERE e.RFC = p.RFC
GROUP BY p.RazonSocial
HAVING AVG(e.Cantidad) > (
    SELECT AVG(Cantidad) 
    FROM Entregan 
    WHERE RFC = 'VAGO780901'
);

/* 10. RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y
 cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001. */
 
SELECT p.RFC, p.RazonSocial
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Proyectos pr ON e.Numero = pr.Numero
WHERE pr.Denominacion = 'Infonavit Durango'
GROUP BY p.RFC, p.RazonSocial
HAVING 
    SUM(CASE WHEN EXTRACT(YEAR FROM e.Fecha) = 2000 THEN e.Cantidad ELSE 0 END) 
    > 
    SUM(CASE WHEN EXTRACT(YEAR FROM e.Fecha) = 2001 THEN e.Cantidad ELSE 0 END);
